import { FC } from "react";

interface VerificationUserProps {
  code: string
}

const VerificationUser: FC<VerificationUserProps> = (props) => {
  const { code } = props;

  return (
    <div>
      <p>
        Code Confirmation: <h2>{code}</h2>
      </p>
      <p>
        <a
          href={`http://localhost:3000/api/auth/verify?code=${code}`}
        >
          Confirm registration
        </a>
      </p>
    </div>
  )
}

export { VerificationUser }