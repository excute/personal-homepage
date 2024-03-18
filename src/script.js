const statusPort = "10100";

const pages = [
  {
    name: "excute",
    avatar: "momiji.png",
    url: "/excute.html",
    id: "272958758999818241",
  },
  {
    name: "hebot",
    avatar: "tsuraisan.png",
    url: "/hebot.html",
    id: "354220127799214092",
  },
  {
    name: "botchi",
    avatar: "araisan.png",
    url: "/botchi.html",
    id: "275275198268309504",
  },
  {
    name: "proto",
    avatar: "fenekku.png",
    url: "/proto.html",
    id: "598856033531592714",
  },
];

function setClass(classList, aClass, aBool) {
  if (aBool && !classList.contains(aClass)) {
    classList.add(aClass);
  } else if (!aBool && classList.contains(aClass)) {
    classList.remove(aClass);
  }
}

async function fetchUsersStatuses() {
  return fetch(`http://oys1751.iptime.org:${statusPort}`).then((res) =>
    res.json()
  );
}

async function setUserStatuses() {
  return fetchUsersStatuses()
    .then((userStatuses) => {
      console.log(JSON.stringify(userStatuses, "", "  "));
      userStatuses.map((anUser) => {
        let foundPage = pages.find((aPage) => aPage.id === anUser.id);
        // online - user is online
        // idle - user is AFK
        // offline - user is offline or invisible
        // dnd - user is in Do Not Disturb
        setClass(
          document.getElementById(`${foundPage.name}-status`).classList,
          "fill-green-500",
          anUser.status === "online"
        );
        setClass(
          document.getElementById(`${foundPage.name}-status`).classList,
          "fill-yellow-500",
          anUser.status === "idle"
        );
        setClass(
          document.getElementById(`${foundPage.name}-status`).classList,
          "fill-mono-500",
          (anUser.status === "offline") |
            (anUser.status === "null") |
            (anUser.status === undefined)
        );
        setClass(
          document.getElementById(`${foundPage.name}-status`).classList,
          "fill-red-500",
          anUser.status === "dnd"
        );
      });
    })
    .then(() => {
      setTimeout(setUserStatuses, 5000);
    })
    .catch((fetchErr) => {
      console.log(`fecth err? ${fetchErr}`);
      setTimeout(setUserStatuses, 60 * 1000);
    });
}

function tickCursor() {
  if (document.getElementById("logo-cursor").style.visibility === "hidden") {
    document.getElementById("logo-cursor").style.visibility = "visible";
  } else {
    document.getElementById("logo-cursor").style.visibility = "hidden";
  }
}

function main() {
  // for (const anUser of pages) {
  // 	document
  // 		.getElementById(`${anUser.name}-status`)
  // 		?.classList?.remove("fill-green-500");
  // 	document
  // 		.getElementById(`${anUser.name}-status`)
  // 		?.classList?.remove("fill-mono-500");
  // 	document
  // 		.getElementById(`${anUser.name}-status`)
  // 		?.classList?.remove("fill-yellow-500");
  // 	document
  // 		.getElementById(`${anUser.name}-status`)
  // 		?.classList?.remove("fill-red-500");
  // }

  setUserStatuses();
  var tickCursorInterval = setInterval(tickCursor, 500);
}
