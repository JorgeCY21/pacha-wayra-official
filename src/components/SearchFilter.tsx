interface Props {
  onRegionChange: (region: string) => void
}

const regions = [
  'Amazonas',
  'Ancash',
  'Apurimac',
  'Arequipa',
  'Ayacucho',
  'Cajamarca',
  'Cusco',
  'Huancavelica',
  'Huanuco',
  'Ica',
  'Junin',
  'La Libertad',
  'Lambayeque',
  'Lima',
  'Loreto',
  'Madre de Dios',
  'Moquegua',
  'Pasco',
  'Piura',
  'Puno',
  'San Martin',
  'Tacna',
  'Tumbes',
  'Ucayali'
];

function SearchFilter({ onRegionChange }: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-white text-center">
        Select Region
      </label>
      <select
        defaultValue="Arequipa"
        onChange={(e) => onRegionChange(e.target.value)}
        className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            🏔️ {region}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SearchFilter