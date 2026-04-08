export interface Message {
  id: number;
  name: string;
  message: string;
  likes: number;
  created_at: string;
}

export interface CreateMessagesBody {
  name: string;
  message: string;
}