import React from "react";

const LoginSignup = (props) => {
  const enterKey = (e) => {
    if (e.key === "Enter") {
      props.submitHandler();
    }
  };

  return (
    <div className=" flex min-h-[80vh] h-full w-full">
      <div
        className="m-auto  bg-charocoal/30 rounded-md  py-10 px-5 flex flex-col
       gap-10 font-bold  justify-center items-center"
      >
        <h1 className="text-2xl opacity-80">{props.title}</h1>
        <div className="flex flex-col gap-5">
          <div className="flex w-full justify-between">
            <label>{props.firstLabel}</label>
            <input
              onChange={(e) =>
                props.setUserData({
                  ...props.userData,
                  username: e.target.value,
                })
              }
              className="p-1 ml-1 rounded-sm"
              type={"text"}
            />
          </div>
          <div className="flex  w-full justify-between">
            <label>{props.secondLabel}</label>
            {props.title === "Login" ? (
              <input
                onChange={(e) =>
                  props.setUserData({
                    ...props.userData,
                    password: e.target.value,
                  })
                }
                onKeyDown={enterKey}
                className="p-1 ml-1 rounded-sm"
                type={"text"}
              />
            ) : (
              <input
                onChange={(e) =>
                  props.setUserData({
                    ...props.userData,
                    name: e.target.value,
                  })
                }
                onKeyDown={enterKey}
                className="p-1 ml-1 rounded-sm"
                type={"text"}
              />
            )}
          </div>
          <p
            onClick={props.isLoginHandler}
            className="text-xs cursor-pointer hover:text-blue"
          >
            {props.isLogin}
          </p>
        </div>

        <div>
          <button
            onClick={() => props.submitHandler()}
            className="bg-blue px-3 py-1 active:opacity-70"
          >
            {props.clickTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
