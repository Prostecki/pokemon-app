export default function PokemonDescription({ description }) {
  return (
    <div className="mb-3">
      <h3 className="font-semibold">Description:</h3>
      <p className="mt-1">{description}</p>
    </div>
  );
}
