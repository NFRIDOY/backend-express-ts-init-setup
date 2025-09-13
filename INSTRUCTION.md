Error : 'No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<...>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.ts(2769)
index.d.ts(168, 5): The last overload is declared here.'

Error Path: src\module\student\student.route.ts
