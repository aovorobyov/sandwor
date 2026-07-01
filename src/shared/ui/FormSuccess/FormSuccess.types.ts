export interface FormSuccessProps {
  /** Текст подтверждения. */
  text: string;
  /** Подпись кнопки возврата к форме. */
  actionLabel: string;
  onReset: () => void;
}
