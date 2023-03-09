export default function NotFound() {
  return (
    <div className="container flex mx-auto items-center h-screen">
      <div className="sm:w-20 md:w-20 lg:w-full" />
      <div className="flex flex-col w-4\/5 ">
        <div className="flex flex-col items-center darkthemebg p-4 lg:p-2 mb-4 rounded homeborder">
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center flex-col w-full rounded text-white">
              Not Found!
              <div className="text-center">
                You happened to get lost in our mysterious pantry. Pressing home
                button will take you back to civilization.
              </div>
              <div className="flex justify-center items-center w-30 pt-2 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
