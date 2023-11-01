import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({percentage}) => {
  return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
}

export default CircularProgress;
