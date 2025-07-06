import TripCard from "./TripCard";
import styles from "./TripCardList.module.scss";

type Trip = {
  id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
};

type Props = {
  trips: Trip[];
};

export default function TripCardList({ trips }: Props) {
  if (trips.length === 0) {
    return <div className={styles.emptyMessage}>여행을 추가해보세요! ✈️</div>;
  }

  return (
    <div className={styles.list}>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
