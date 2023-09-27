import renderer from "react-test-renderer";
import {Spinner} from "../index";

describe("Spinner Snapshot", () => {
  it("should render a large blue spinner", () => {
    const props = { loading: true, size: "large", color: "blue" };

    const comp = renderer.create(<Spinner {...props} />);
    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
