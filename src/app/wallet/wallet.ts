export interface IWalletCommon {
  address: string;
  userId: string;
}

export interface IWalletView extends IWalletCommon {
  label: string;
  walletId?: string;
}

export interface IWallet extends IWalletView {
  password: string;
}

export interface IWalletRequest {
  label: string;
  password: string;
}
