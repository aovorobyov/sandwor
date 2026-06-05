export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  options: SelectOption[];
  /**
   * Вторым аргументом приходит `name` селекта (пустая строка, если не задан) —
   * чтобы один хендлер мог обслуживать несколько селектов.
   */
  onChange: (value: string, name: string) => void;
  /** Имя поля — попадает в кнопку-триггер. */
  name?: string;
  className?: string;
}
