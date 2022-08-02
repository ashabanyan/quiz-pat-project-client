import { RouteComponentProps } from 'react-router';
import { IRootStore } from '../store';

export interface BaseLayoutProps extends RouteComponentProps<{}> {}

export interface StoreProps {
    store?: IRootStore;
}
export interface BaseComponentProps extends StoreProps {

}
export interface BasePageProps extends BaseComponentProps {

}