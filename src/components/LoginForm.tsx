import {
  profileId,
  useLogin,
  useProfilesManaged,
} from "@lens-protocol/react-web";
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function LoginForm({
  owner,
  onSuccess,
}: {
  owner: string;
  onSuccess?: () => void;
}) {
  const { push } = useRouter();
  const { execute: login, loading: isLoginPending } = useLogin();
  const {
    data: profiles,
    error,
    loading,
  } = useProfilesManaged({ for: owner, includeOwned: true });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = profileId(formData.get("id") as string);

    const result = await login({
      address: owner,
      profileId: id,
    });

    if (result.isSuccess()) return onSuccess?.();

    console.error(result.error.message);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (profiles.length === 0)
    return (
      <p className="mb-4 text-base text-gray-500">
        No Lens Profiles found in this wallet.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <fieldset className="flex place-items-center flex-col">
        <p className="text-base text-gray-500">
          Select a Lens Profile to login with.
        </p>

        <div className="my-4 space-y-2 w-full">
          {profiles.map((profile, idx) => (
            <label
              key={profile.id}
              className="w-full items-center p-4 rounded-lg cursor-pointer bg-gray-100 border hover:border-gray-300 grid grid-cols-[24px_auto]"
            >
              <input
                disabled={isLoginPending}
                type="radio"
                defaultChecked={idx === 0}
                name="id"
                value={profile.id}
                className="box-content h-1.5 w-1.5 appearance-none rounded-full border-4 border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-green-500 checked:ring-green-500"
              />
              <span className="text-gray-800 text-sm font-semibold">
                {profile.handle?.fullHandle ?? profile.id}
              </span>
            </label>
          ))}
        </div>

        <div className="w-full mt-5">
          <Button disabled={isLoginPending} type="submit" color="success">
            {isLoginPending ? "Sign message in your wallet" : "Login to Lens"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
