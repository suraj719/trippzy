import React from "react";

export default function CommunityPage() {
  return (
    <>
      <div>
        <div>
          <main className="my-10 flex gap-3 h-[75vh]" style={{
        maxHeight:"80vh",
        overflow:"auto"
          }}>
            <aside className="hidden space-y-5 md:block border-r  md:w-3/12 lg:w-2/12">
              <div className="space-y-3">
                <h4>categories</h4>
                <ul className="ml-2 space-y-3">
                  {/* Placeholder list items */}
                  <li>
                    <a href="#" className="text-base">
                      <i className="mr-1"></i>
                      joyful
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base">
                      <i className="mr-1"></i>
                      religional
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base">
                      <i className="mr-1"></i>
                      family
                    </a>
                  </li>
                </ul>
              </div>

              <hr />

              <div className="space-y-5">
                <h4>top xp</h4>
                <div>
                  {/* Placeholder person items */}
                  <div className="flex items-center gap-2">
                    <img
                      src="../images/guide1.jpeg"
                      alt="avatar"
                      className="h-14 w-14 rounded-full"
                    />
                    <div className="flex flex-col">
                      <a href="profile.html" className="text-base">
                        Person 1
                      </a>
                      <p className="text-sm">XP: 100</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="space-y-3">
                <h4>statistics</h4>
                <ul className="ml-2 space-y-3">
                  <li>
                    <i className="fas fa-user"></i>
                    Count user : 10
                  </li>
                  <li>
                    <i className="fas fa-question-circle"></i>
                    Count topics : 100
                  </li>
                  <li>
                    <i className="fas fa-comment-dots"></i>
                    Count reply : 450
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    Count best reply : 48
                  </li>
                </ul>
              </div>
            </aside>

            <aside className="w-full md:w-9/12 lg:w-10/12">
              <div className="text-center ">
                <h2 className="mb-2 text-gray-200">Community forum</h2>
                <h4>
                  A place where you can connect with like minded travellers ...
                </h4>
              </div>

              <div className="mt-5 grid grid-cols-12 gap-5">
                <div className="col-span-12 sm:col-span-9 xl:col-span-10">
                  <form>
                    <div className="flex items-cente h-full justify-start">
                      <input
                        type="text"
                        className=" m-0 rounded-r-none py-1 w-full border border-gray-600 rounded-md p-2"
                        name=""
                        placeholder="search your topics"
                      />
                      <button
                        // type="submit"
                        className="btn w-[initial] rounded-l-none bg-sky-400 h-full p-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pt-2 bg-sky-500 text-center rounded">
                  <a href="#" className="btn w-[initial]">
                    new topic
                  </a>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-12 items-center gap-3 sm:gap-0">
                <div className="col-span-12 sm:col-span-3 ">
                  <select className="form-control capitalize bg-black mx-4">
                    <option selected>sort by</option>
                    <option value="newest">newest</option>
                    <option value="oldest">oldest</option>
                    <option value="no-answer">no answer</option>
                    <option value="solved">solved</option>
                  </select>
                </div>

                <div className="relative col-span-12 block sm:col-start-10 sm:col-end-13 md:hidden">
                  <button className="form-control">categories</button>
                  <div className="absolute top-14 right-0 z-20 hidden w-full space-y-3 rounded-lg border-2 border-slate-600 bg-slate-800 p-2 sm:min-w-[200px]">
                    <ul className="ml-2 space-y-3">
                      {/* Placeholder list items */}
                      <li>
                        <a href="#" className="text-base">
                          <i className="mr-1"></i>
                          Category 1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-base">
                          <i className="mr-1"></i>
                          Category 2
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <section className="my-5 space-y-3">
                {/* Placeholder discussion items */}
                <div className="space-y-6 rounded-lg bg-slate-800 p-4 font-medium text-gray-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="../images/guide1.jpeg"
                        alt="jane doe"
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col">
                        <a href="#" className="text-base">
                          Raj Narendra
                        </a>
                        <p className="text-sm">2023-01-01</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="select-none rounded-lg bg-slate-900 p-3 text-center">
                        <p className="text-sm">reply</p>
                        <p>1</p>
                      </div>
                      <div className="select-none rounded-lg bg-slate-900 p-3 text-center">
                        <p className="text-sm">visit</p>
                        <p>5</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">
                      <a href="#">
                        Every trip has its own vibe, memories, and there are
                        difference in every trip. On my last trip to Pondicherry
                        in June 2023, the trip seemed to be perfect in every
                        sense. I was going on a trip with all new people, and I
                        was thinking about how it was going to be. But things
                        turned out to be so smooth that the trip was one of the
                        most memorable trips of my life.
                      </a>
                    </p>
                    {/* <p className="line-clamp-2 my-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum at totam ipsam dolorum commodi iste!
                    </p> */}
                  </div>

                  <hr />

                  <div className="mt-5 flex justify-start gap-4">
                    <a href="#" className="tag">
                      #india
                    </a>
                    <a href="#" className="tag">
                      #pondicherry
                    </a>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cursor-pointer"
                      >
                        <i className="fas fa-trash ml-1"></i>
                      </a>
                      <a href="#" className="cursor-pointer">
                        <i className="fas fa-edit ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 rounded-lg bg-slate-800 p-4 font-medium text-gray-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="../images/guide2.jpeg"
                        alt="jane doe"
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col">
                        <a href="#" className="text-base">
                          alexa
                        </a>
                        <p className="text-sm">2023-01-01</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="select-none rounded-lg bg-slate-900 p-3 text-center">
                        <p className="text-sm">reply</p>
                        <p>1</p>
                      </div>
                      <div className="select-none rounded-lg bg-slate-900 p-3 text-center">
                        <p className="text-sm">visit</p>
                        <p>5</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">
                      <a href="#">
                        can you guys suggest some good places to visit near
                        canada
                      </a>
                    </p>
                  </div>

                  <hr />

                  <div className="mt-5 flex justify-start gap-4">
                    <a href="#" className="tag">
                      #canada
                    </a>
                    <a href="#" className="tag">
                      #usa
                    </a>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="cursor-pointer"
                      >
                        <i className="fas fa-trash ml-1"></i>
                      </a>
                      <a href="#" className="cursor-pointer">
                        <i className="fas fa-edit ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
