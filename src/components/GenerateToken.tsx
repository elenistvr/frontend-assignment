import { FC } from "react";

const generateToken = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 10;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomChar = Math.floor(Math.random() * characters.length);
    token += characters[randomChar];
  }
  return token;
};

interface TokenProps {
  tokenGenerated: (token: string) => void;
}

const GenerateToken: FC<TokenProps> = ({ tokenGenerated }) => {
  const handleGenerateToken = (): void => {
    const token = generateToken();
    tokenGenerated(token);
  };

  return (
    <div>
      <button onClick={handleGenerateToken}>Login</button>
    </div>
  );
};

export default GenerateToken;