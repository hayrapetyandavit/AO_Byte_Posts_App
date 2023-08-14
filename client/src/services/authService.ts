export type AuthType = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isChecked?: boolean;
};

export const registerUser = async (data: AuthType) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const loginUser = async (data: AuthType) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  let url = `${process.env.REACT_APP_API_URL}login`;

  if (token) {
    url = `${process.env.REACT_APP_API_URL}login/${encodeURIComponent(token!)}`;
  }

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

export const forgotPassword = async ({ email }: { email: string }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}forgot-password`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const resetPassword = async (data: AuthType) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}reset-password/${encodeURIComponent(
      token!
    )}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

export const isAuthService = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}check-session`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    if (errorMessage === "Please authenticate") {
      return { isVerify: false };
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const logoutUser = async () => {
  await fetch(`${process.env.REACT_APP_API_URL}logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
