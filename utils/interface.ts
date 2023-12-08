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

export interface ListTaskProps {
  id?: number;
  title?: string;
  desc: string;
  date?: string;
  status?: string;
  isFavorite?: boolean;
  isEdit: boolean;
  onRemoveTask?: () => void;
  setIsEdit: (value: boolean) => void;
  onClick?: () => void;
}

export interface PopupMessageProps {
  message: string;
  type: string;
}
export interface FormModalProps {
  setIsShowModal: (value: boolean) => void;
  updateListTask: (value: any) => void;
  updateEditedTask: (value: any) => void;
  showErrorMessage: (value: string) => void;
  showSuccessMessage: (value: string) => void;
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
  selectedTask: any;
}

export interface ListNotificationProps {
  messageDeadline: string;
  listTaskDeadline: [];
  isEdit: boolean;
  onRemoveTask?: () => void;
  setIsEdit: (value: boolean) => void;
  onClick?: () => void;
}