import * as dfns from 'date-fns';

interface TimeAgoProps {
  timestamp: string;
}
/**
 * 
 * @param param0 {string} timestamp The date when post was created.
 * @returns ReactElement
 */
export function TimeAgo({ timestamp }: TimeAgoProps) {

  let timeAgo = '';

  if (timestamp) {
    const date = dfns.parseISO(timestamp);
    const timePeriod = dfns.formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}
