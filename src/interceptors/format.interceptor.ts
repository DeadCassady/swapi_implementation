import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from 'rxjs'

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, handler: CallHandler<any>): Observable<any> {

    return handler.handle().pipe(
      map((items) => {
        const entries = this.transformClass(items)
        const data = {
          entries
        }
        return data
      }
      )
    )
  }

  transformClass(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.transformItem(item))
    }
    return this.transformItem(data)
  }

  transformItem(item: any) {
    if (!item || typeof item !== 'object') return item
    const transformed = { ...item }

    for (const [key, value] of Object.entries(transformed)) {
      if (this.isRelation(value)) {
        transformed[key] = this.getUrl(value)
      } else if (Array.isArray(value) && value.length > 0 && this.isRelation(value[0])) {
        transformed[key] = value.map(v => this.getUrl(v))
      }
    }
    return transformed
  }

  isRelation(value: any): boolean {
    return value && typeof value === 'object' && 'url' in value
  }

  getUrl(value: any): string {
    return value.url
  }
}

