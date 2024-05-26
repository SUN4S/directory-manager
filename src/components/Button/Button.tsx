import * as S from "@components/Button/Button.styled.ts";

interface ButtonInterface {
    handleClick: () => void;
    text: string;
}

export default function Button({ handleClick, text }: ButtonInterface) {
    return <S.ButtonStyled onClick={handleClick}>{text}</S.ButtonStyled>;
}
