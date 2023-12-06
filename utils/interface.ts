export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavbarProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  isExplore?: boolean;
  text: string;
  handleButton?: () => void;
}

export interface ContainerProps {
  isLandingPage?: boolean;
  children?: React.ReactNode;
  id?: string;
}