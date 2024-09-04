import { IVariantsButton } from "./Button";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    variant?: IVariantsButton;
    isLoading?:boolean;
} 

export interface IButtonChevronProps extends IButtonProps {
  arrow: "left" | "right" | "top" | "bottom";
}

export interface IButtonPropsWithText extends IButtonProps { 
    text?: string | React.ReactNode;
}