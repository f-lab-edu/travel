import styles from "./SectionCard.module.scss";

type Props = {
  title: string;
  content: string;
};

export default function SectionCard({ title, content }: Props) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
