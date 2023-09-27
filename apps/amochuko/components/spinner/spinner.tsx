import React from 'react'

type Props = {
  loading: boolean;
  size: string;
  color: string;
};

export  function Spinner(props: Props) {
  return props.loading ? (
    <div
      className={`icon icon-spin text-center ${props.size} ${props.color}`}
    />
  ) : null;
}
