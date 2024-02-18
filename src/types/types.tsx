import {KeyboardType, TextInput} from 'react-native';

export type TextInputBoxProps = {
  onChangeText: (val: string) => void;
  value: string;
  label: string;
  placeholder: string;
  textRef: React.Ref<TextInput>;
  setFocus: (e: any) => void;
  isError: boolean;
  type: string;
  isEditable: boolean;
  width: string;
  keyboardType: KeyboardType | undefined;
};


export type EmailPhoneInputProps = {
  onChangeText: (val: string) => void;
  value: string;
  placeholder: string;
  textRef: React.Ref<TextInput>;
  setFocus: (e: any) => void;
  isError: boolean;
  width: string;
};

export type HeaderProps = {
  backgroundColor: string;
  translucent: boolean;
};

export type SignInProps = {
  setIsSelected: (val: string) => void;
};

export type SignUpProps = {
  setIsSelected: (val: string) => void;
};

export type SubHeaderProps = {
  title: string;
  onPress: () => void;
  backArrow:boolean
};

export type searchProps = {
  onPress: (value:any) => void;
}

export type AccessTokenprops = {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: string;
  state: string;
  scope: string;
};

export type FlightsItem = {
  id: string;
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      duration: string;
      numberOfStops: number;
    }[];
  }[];
  price: {
    currency: string;
    total: string;
  };
};
