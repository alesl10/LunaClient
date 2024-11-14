import { Button, Spinner } from "flowbite-react";

function Loading() {
  return (
    <div className="flex justify-center flex-row gap-3">
      <Button className="w-full">
        <Spinner aria-label="Spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
}

export default Loading;
