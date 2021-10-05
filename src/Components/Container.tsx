import AddComponent from "./AddComponent";
import ComponentContainer from "./ComponentContainer";
import RemoveComponent from "./RemoveComponent";

const Container = (): JSX.Element => {
  return (
    <div className="bg-white shadow-md m-2 rounded-md w-full p-5">
      <div className="grid">
        <div className="grid grid-cols-1 gap-3">
          <AddComponent className="col-span-1" />
          <ComponentContainer className="col-span-1" />
          <RemoveComponent className="col-span-1" />
        </div>
      </div>
    </div>
  );
};

export default Container;
