import { AxiosError, AxiosResponse, ResponseType } from "axios";
import React, { MutableRefObject, Component, ReactNode } from "react";
type FxNotificationType = 'SUCC' | 'WARN' | 'ERROR' | 'INFO';
interface FxNotificationPayload {
    type?: FxNotificationType;
    title?: string;
    message: string;
}
type FxNotificationToast = string | FxNotificationPayload;
type Notifiable = FxNotificationToast | any;
type DoneDelegate<T> = (res: T | null, error: Error | null, resp?: AxiosResponse | null) => Notifiable;
type SucceedDelegate<T> = (data: T, resp: AxiosResponse) => Notifiable;
type ErrorDelegate<T> = (data: T, error: AxiosResponse<T>) => Notifiable;
type QueryType = string | number | bigint | boolean;
type Queries = {
    [key: string]: QueryType | QueryType[];
};
type Headers = {
    [key: string]: string;
};
type DataPrimTypes = string | number | bigint | boolean | null;
type DataObjTypes = Array<DataPrimTypes> | {
    [key: string]: DataPrimTypes;
};
type DataTypeValues = DataPrimTypes | DataObjTypes | {
    [key: string]: DataObjTypes;
};
type DataType = {
    [key: string]: DataTypeValues | MutableRefObject<HTMLElement | null> | DataType;
};
type Data = DataType | (() => DataType) | string;
interface FxErrorResponse<T, TR> extends AxiosResponse<T> {
    reduced: TR;
}
interface FxError<T, TR> extends AxiosError<T> {
    response?: FxErrorResponse<T, TR>;
}
interface FxApiRequest<TR = any, TE = any, TRR = TR, TER = TE> {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    url: string;
    cacheMaxAge?: number;
    throttle?: boolean;
    delay?: number;
    responseType?: ResponseType;
    query?: Queries;
    headers?: Headers;
    data?: Data;
    reducer?: (data: TR) => TRR;
    errReducer?: (data: TE, error: AxiosError<TE>) => TER;
}
export function setDefaultHeaders(headers: {
    [key: string]: string;
}): void;
export function setBaseUrl(url: string): void;
export interface UseRequestProps<TR, TE, TRR = TR, TER = TE> {
    done?: DoneDelegate<TR>;
    success?: SucceedDelegate<TRR>;
    error?: ErrorDelegate<TER>;
}
export const notify: (payload: Notifiable, type: FxNotificationType) => void;
export function useRequest<TR = any, TE = any, TRR = TR, TER = TE>(api: FxApiRequest<TR, TE, TRR, TER>, props?: UseRequestProps<TR, TE, TRR, TER>): {
    reqId: number;
    request: (wrapperParams?: {
        data?: string | import("src/request").DataType | (() => import("src/request").DataType) | undefined;
        query?: Queries | undefined;
        headers?: Headers | undefined;
    } | undefined) => boolean;
    response: {
        busy: boolean;
        response: TRR | undefined;
        errorResponse: TER | undefined;
    };
    cancel: () => void;
};
interface FxButtonProps<TR, TE, TRR, TER> {
    tag?: string;
    children?: ReactNode;
    className?: string;
    label?: string;
    api: FxApiRequest<TR, TE, TRR, TER>;
    done?: DoneDelegate<TR>;
    success?: SucceedDelegate<TRR>;
    error?: ErrorDelegate<TER>;
}
interface FxButtonStates {
    busy: boolean;
}
export class FxButton<TR = any, TE = any, TRR = TR, TER = TE> extends Component<FxButtonProps<TR, TE, TRR, TER>, FxButtonStates> {
    constructor(props: FxButtonProps<TR, TE, TRR, TER>);
    handleClick(): void;
    render(): JSX.Element;
}
type Renderer<T> = (data: T | null, reloaded?: boolean) => React.ReactNode;
type ErrorRenderer<T, TR> = (data: TR | null, error: FxError<T, TR>) => React.ReactNode;
type LoadingRenderer = () => React.ReactNode;
interface FxGuardProps<TR, TE, TRR, TER> {
    api: FxApiRequest<TR, TE, TRR, TER>;
    render: Renderer<TRR>;
    error?: ErrorRenderer<TE, TER>;
    done?: ReleaseDelegate;
    loading?: LoadingRenderer;
    disableLoading?: boolean;
    naked?: boolean;
}
type ReleaseDelegate = (succeed?: boolean) => void;
interface FxGuardStates {
    refreshId: number;
    reloadId: number;
    busy: boolean;
}
export class FxGuard<TR = any, TE = any, TRR = TR, TER = TE> extends Component<FxGuardProps<TR, TE, TRR, TER>, FxGuardStates> {
    constructor(props: FxGuardProps<TR, TE, TRR, TER>);
    reload(silent?: boolean): void;
    releaseBusy(succeed: boolean): void;
    render(): JSX.Element;
}

//# sourceMappingURL=index.d.ts.map
