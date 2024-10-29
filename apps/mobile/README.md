# Mobile App - Information (Must Read)

### metro.config.js

We need to set `unstable_enablePackageExports` to `false` in the metro config due to `import.meta` not being allowed. This is because we're using zustand and it causes issues with the build. There are other libraries in use causing the same error as we dropped zustand to 3.7.2 and the error still persisted but it look like it was coming from another library.

reference: https://discord.com/channels/695411232856997968/1271261219403071569

2. Sentry uploading source maps will fail if there is an 'import.meta' in the source code and `unstable_enablePackageExports` to `true` in the metro config. The solution is to set `unstable_enablePackageExports` to `false` in the metro config always at this point in time.

### Sentry Errors

1. We must have sentry core pegged to 7.118.0 as there is a breaking change in the way source code.

json
{
"@sentry/core": "=7.118.0",
"@sentry/react": "=7.118.0"
}


reference: https://github.com/getsentry/sentry-react-native/issues/3929
