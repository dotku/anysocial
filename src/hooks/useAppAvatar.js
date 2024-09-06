import { useState, useEffect } from "react";

// @todo
export async function getAvatarURL({ user, name }) {
  const names = {
    liara: "liara",
    pravatar: "pravatar",
    robohash: "robohash",
    placebear: "placebear",
    placebeard: "placebeard",
    loremflickr: "loremflickr",
    dicebear: "dicebear",
  };

  const urls = [
    {
      url: `https://avatar.iran.liara.run/public?username=${user.email}`,
      name: "liara",
    },
    { url: `https://i.pravatar.cc/250?u=${user.email}`, name: "pravatar" },
    {
      url: `https://loremflickr.com/g/320/240?random=${user.name}`,
      name: "loremflickr",
    },
    { url: `https://robohash.org/${user.email}`, name: "robohash" },
    {
      url: `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.email}`,
      name: "dicebear",
    },
    { url: `https://placebear.com/200/300?${user.email}`, name: "placebear" },
    { url: `https://placebeard.it/200x200?${user.email}`, name: "palcebeard" },
  ];

  if (Object.keys(names).includes(name))
    return urls.find((urlItem) => urlItem.name === name).url;

  const controllers = urls.map(() => new AbortController());

  try {
    const fastestURL = await Promise.race(
      urls.map(({ url }, index) =>
        fetch(url, { signal: controllers[index].signal }).then((response) => {
          if (response.ok) {
            // Cancel the remaining requests
            controllers.forEach((controller, i) => {
              if (i !== index) {
                controller.abort();
              }
            });
            return url;
          }
          throw new Error("Failed to fetch");
        })
      )
    );
    return fastestURL;
  } catch (error) {
    console.error("Failed to fetch avatar");
    // console.error(error)
    return null;
  }
}

export function useAppAvatar({ user, name }) {
  const [avatarURL, setAvatarURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch the avatar URL when the user object changes
    const fetchAvatar = async () => {
      setLoading(true);
      const url = await getAvatarURL({ user, name });
      if (isMounted) {
        setAvatarURL(url);
        setLoading(false);
      }
    };

    fetchAvatar();

    // Cleanup to prevent updating state if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [user]);

  return { avatarURL, loading };
}
