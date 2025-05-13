import styles from './style.module.css';

type DefaultInputHashProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export function DefaultInputHash({ id, labelText, type, ...rest }: DefaultInputHashProps) {
  return (
    <>
    {labelText && <label htmlFor={id}>{labelText}</label>}
    <input className={styles.input} id={id} type={type} {...rest} />
    </>
    );
}