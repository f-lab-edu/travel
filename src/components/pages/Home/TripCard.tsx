import styles from "./TripCard.module.scss";
import { format } from "date-fns";

type TripCardProps = {
  trip: {
    id: number;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
  };
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url("https://picsum.photos/600/400?random=${trip.id}")`,
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.flagWrapper}>
          <img
            src={`https://flagcdn.com/w40/${trip.destination.toLowerCase()}.png`}
            alt={`${trip.destination} flag`}
            width={32}
            height={24}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{trip.title}</h3>
          <p className={styles.date}>
            {format(new Date(trip.start_date), "yyyy.MM.dd")} ~{" "}
            {format(new Date(trip.end_date), "yyyy.MM.dd")}
          </p>
        </div>
      </div>
    </div>
  );
}
