import { ResponseType, AxiosResponse, AxiosError } from "axios";
import React, { MutableRefObject, Component, ReactNode } from "react";
type FxNotificationType = 'SUCC' | 'WARN' | 'ERROR' | 'INFO';
interface FxNotificationPayload {
    type?: FxNotificationType;
    title?: string;
    message: string;
}
type FxNotificationToast = string | FxNotificationPayload;
type QueryType = string | number | boolean;
type Queries = {
    [key: string]: QueryType | QueryType[];
};
type Headers = {
    [key: string]: string;
};
type DataTypeValues = string | number | boolean | null;
type DataType = {
    [key: string]: DataTypeValues | MutableRefObject<HTMLElement | null> | DataType;
};
type Data = DataType | (() => DataType) | string;
interface FxApiRequest {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    url: string;
    cacheMaxAge?: number;
    throttle?: boolean;
    delay?: number;
    responseType?: ResponseType;
    query?: Queries;
    headers?: Headers;
    data?: Data;
}
export type Notifiable = FxNotificationToast | null | undefined | void;
export type DoneDelegate<T> = (res: T | null, error: Error | null, resp?: AxiosResponse | null) => Notifiable;
export type SucceedDelegate<T> = (data: T, resp: AxiosResponse) => Notifiable;
export type ErrorDelegate<T> = (data: T, error: AxiosResponse<T>) => Notifiable;
interface FxButtonProps<TR, TE> {
    children?: ReactNode;
    className?: string;
    label?: string;
    api: FxApiRequest;
    done?: DoneDelegate<TR>;
    success?: SucceedDelegate<TR>;
    error?: ErrorDelegate<TE>;
}
interface FxButtonStates {
    busy: boolean;
}
export class FxButton<TR = any, TE = any> extends Component<FxButtonProps<TR, TE>, FxButtonStates> {
    constructor(props: FxButtonProps<TR, TE>);
    handleClick(): void;
    render(): JSX.Element;
}
type Renderer<T> = (data: T) => React.ReactNode;
type ErrorRenderer<T> = (data: T, error: AxiosError<T>) => React.ReactNode;
type LoadingRenderer = () => React.ReactNode;
interface FxGuardProps<TR, TE = AxiosError> {
    api: FxApiRequest;
    render: Renderer<TR>;
    error?: ErrorRenderer<TE>;
    done?: ReleaseDelegate;
    loading?: LoadingRenderer;
    naked?: boolean;
}
type ReleaseDelegate = (succeed?: boolean) => void;
interface FxGuardStates {
    refreshId: number;
    reloadId: number;
    busy: boolean;
}
export class FxGuard<TR = any, TE = any> extends Component<FxGuardProps<TR, TE>, FxGuardStates> {
    constructor(props: FxGuardProps<TR, TE>);
    reload(silent?: boolean): void;
    releaseBusy(succeed: boolean): void;
    render(): JSX.Element;
}

//# sourceMappingURL=index.d.ts.map
