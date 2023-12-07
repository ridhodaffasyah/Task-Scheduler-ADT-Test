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

export interface ListContactProps {
  id?: number;
  title?: string;
  desc: string;
  date?: string;
  status?: string;
  isFavorite?: boolean;
  isEdit: boolean;
  onFavoriteToggle?: () => void;
  onUnfavoriteToggle?: () => void;
  onRemoveContact?: () => void;
  setIsEdit: (value: boolean) => void;
  onClick?: () => void;
}
