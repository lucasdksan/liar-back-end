import { Entity } from "../../../../shared/domain/entities/entity";
import { ConflictError } from "../../../../shared/domain/errors/conflict-error";
import { EntityValidationError } from "../../../../shared/domain/errors/entity-validation-error";
import { schema } from "./room-schema-entity";

export type RoomProps = {
    hostId: string;
}

export type PlayerRoomProps = {
    id: string;
    nickname: string;
    socketId: string;
    alive: boolean;
    cards: string[];
}

export class RoomEntity extends Entity<RoomProps> {
    private players: PlayerRoomProps[] = [];
    private deck: string[] | [] = [];
    private referece: "k" | "q" | "a" = "k";

    constructor(public props: RoomProps, id?: string){
        super(props, id);
        
        RoomEntity.validate(props);
    }

    updateReference(newReference: "k" | "q" | "a") {
        this.referece = newReference;
    }

    getReference(): "k" | "q" | "a" {
        return this.referece;
    }

    addPlayer(player: PlayerRoomProps) {
        if(this.players.length > 4) throw new ConflictError("The room is complete");

        this.players.push(player);
    }

    updatePlayer(playerId: string, updatedProps: Partial<PlayerRoomProps>) {
        const index = this.players.findIndex((player) => player.id === playerId);
        if (index === -1) throw new ConflictError("Player not found");

        this.players[index] = {
            ...this.players[index],
            ...updatedProps,
        };
    }

    updateAllPlayers(updatedPlayers: PlayerRoomProps[]) {
        if (updatedPlayers.length > 4) throw new ConflictError("The room cannot have more than 4 players");

        const uniqueIds = new Set(updatedPlayers.map((player) => player.id));

        if (uniqueIds.size !== updatedPlayers.length) 
            throw new ConflictError("Duplicate player IDs are not allowed");

        this.players = updatedPlayers;
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    getPlayers(): PlayerRoomProps[] {
        return this.players;
    }

    getPlayer(id: string): PlayerRoomProps {
        const index = this.players.findIndex((player) => player.id === id);
        
        return this.players[index];
    }

    isEmpty(): boolean {
        return this.players.length === 0;
    }

    shuffleCard(): void {
        const cards = [
            "k", "k", "k", "k", "k", "k",
            "q", "q", "q", "q", "q", "q",
            "a", "a", "a", "a", "a", "a",
            "j", "j",
        ];
        
        const reference: "k" | "q" | "a" = ["k", "q", "a"][Math.floor(Math.random() * 3)] as "k" | "q" | "a";

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        this.updateReference(reference);
    
        const players = this.getPlayers().filter((player) => player.alive);
        const cardsPerPlayer = Math.floor(cards.length / players.length);
    
        let currentIndex = 0;
    
        players.forEach((player) => {
            player.cards = cards.slice(currentIndex, currentIndex + cardsPerPlayer);
            currentIndex += cardsPerPlayer;
        });
    
        this.updateDeck(cards.slice(currentIndex));
        this.updateAllPlayers(players);
    }
    
    updateDeck(newDeck: string[]) {
        this.deck = newDeck;
    }

    takeFromDeck(amount: number): string[] {
        if (amount > this.deck.length) {
            throw new ConflictError("Not enough cards in the deck");
        }

        const takenCards = this.deck.slice(0, amount);
        this.deck = this.deck.slice(amount);
        return takenCards;
    }

    getDeck(): string[] {
        return [...this.deck];
    }

    static validate(props: RoomProps) {
        const result = schema.safeParse(props);

        if (!result.success) {
            throw new EntityValidationError(`Validation error: ${result.error.message}`);
        }
    }
}