import TripCard from "./TripCard";
import styles from "./TripCardList.module.scss";
import { MESSAGES } from "@/constants/messages";

type Trip = {
  id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
};

type Props = {
  tripList: Trip[];
};

export default function TripCardList({ tripList }: Props) {
  if (tripList.length === 0) {
    return (
      <div className={styles.emptyMessage}>{MESSAGES.trip.EMPTY_TRIP_LIST}</div>
    );
  }

  return (
    <div className={styles.list}>
      {tripList.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
