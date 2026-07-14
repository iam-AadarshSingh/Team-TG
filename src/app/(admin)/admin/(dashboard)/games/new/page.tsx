import { createGame } from "@/app/actions/games";
import { GameForm } from "@/components/admin/game-form";

export default function NewGamePage() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">New Game</h1>
      <div className="mt-8">
        <GameForm action={createGame} />
      </div>
    </div>
  );
}
