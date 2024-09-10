export function HabitsErrorFallback() {
  return (
    <div className="h-32 flex items-center justify-center">
      <p className="text-center">
        Não foi possível carregar os hábitos. Por favor, tente novamente recarregando a página.
      </p>
    </div>
  );
}
