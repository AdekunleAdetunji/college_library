export interface ResponseInterface {
  isSuccess: boolean;
  status: number;
  message: string;
  data?: {
    [key: string]: any;
  };
}
