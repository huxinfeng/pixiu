const a = () => {
  // // log.ts
  // function log(target: any, key: string, descriptor: PropertyDescriptor) {
  //   const originalMethod = descriptor.value;

  //   descriptor.value = function (...args: any[]) {
  //     console.log(`Calling ${key} with arguments:`, args);
  //     const result = originalMethod.apply(this, args);
  //     console.log(`Method ${key} returned:`, result);
  //     return result;
  //   };

  //   return descriptor;
  // }

  // class Example {
  //   @log
  //   add(a: number, b: number): number {
  //     return a + b;
  //   }
  // }

  // const instance = new Example();
  // console.log(instance.add(2, 3)); // 输出日志并返回 5

  // log-parameter.ts
  function logParameter(target: any, key: string | symbol, index: number) {
    const metadataKey = `log_${String(key)}_parameters`;
    if (Array.isArray(target[metadataKey])) {
      target[metadataKey].push(index);
    } else {
      target[metadataKey] = [index];
    }
  }

  class Example {
    greet(message: string, name: string) {
      console.log(`${message}, ${name}!`);
    }
  }

  const example = new Example();

  // 在方法上应用装饰器
  logParameter(example, 'greet', 0); // 第一个参数的索引是0
  logParameter(example, 'greet', 1); // 第二个参数的索引是1

  example.greet('Hello', 'John');
};

export default a;
