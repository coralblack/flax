import React, { Component } from "react";
interface FxButtonProps {
}
export function FxButton(_props: FxButtonProps): JSX.Element;
type QueryType = string | number | boolean;
type Query = {
    [key: string]: QueryType | QueryType[];
};
interface FxApiRequest {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    url: string;
    cacheMaxAge?: number;
    throttle?: boolean;
    delay?: number;
    query?: Query;
}
type Renderer<T> = (data: T) => React.ReactNode;
interface FxGuardProps<T> {
    api: FxApiRequest;
    render: Renderer<T>;
}
interface FxGuardStates {
    count: number;
    busy: boolean;
}
export class FxGuard<T = any> extends Component<FxGuardProps<T>, FxGuardStates> {
    constructor(props: FxGuardProps<T>);
    reload(): void;
    releaseBusy(): void;
    render(): JSX.Element;
}

//# sourceMappingURL=index.d.ts.map
