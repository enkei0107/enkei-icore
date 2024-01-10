import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../response/response.interceptor';

export const InterceptorProvider: Provider<any>[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
];
