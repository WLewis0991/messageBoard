export interface messages {
  id: number;
  name: string;
  message: string;
  like: number;
  created_at: string;
}

export interface CreateMessagesBody {
  name: string;
  message: string;
}