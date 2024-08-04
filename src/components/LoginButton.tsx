"use client";

import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const { push } = useRouter();

  return <Button onClick={() => push("/")}>Log in</Button>;
}
