export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          specs: string;
          price: string;
          image: string;
          affiliate_url: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          specs: string;
          price: string;
          image: string;
          affiliate_url: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          specs?: string;
          price?: string;
          image?: string;
          affiliate_url?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
