const Utility = {
  DatePicker: function DatePicker(props:any) {
    return (
      <div style={{ color: props.color }}>
        Imagine a {props.color} datepicker here!
      </div>
    );
  },
  Repeat: function Repeat(props:any) {
    let itms = [];

    let i = 0;
    do {
      i++;
      itms.push(props.children(i));
    } while (i < props.numTimes);

    return <div>{itms}</div>;
  },
};

export default Utility;

