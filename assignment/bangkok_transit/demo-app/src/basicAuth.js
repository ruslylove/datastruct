'use strict';

const crypto = require('crypto');

function safeEqual(a, b) {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  // Pad to equal length before comparing so mismatched lengths don't
  // short-circuit (and leak length via timing) before timingSafeEqual runs.
  const len = Math.max(bufA.length, bufB.length, 1);
  const paddedA = Buffer.alloc(len);
  const paddedB = Buffer.alloc(len);
  bufA.copy(paddedA);
  bufB.copy(paddedB);
  return bufA.length === bufB.length && crypto.timingSafeEqual(paddedA, paddedB);
}

/**
 * Gates every request behind HTTP Basic Auth using DEMO_USER / DEMO_PASS
 * from the environment. This exists because this app is a working
 * solution to a live course assignment -- deploying it publicly without a
 * gate would let students who find the URL see the reference solution.
 *
 * If DEMO_USER / DEMO_PASS are not set (e.g. local development), the gate
 * is skipped entirely so `npm start` stays frictionless.
 */
function basicAuth(req, res, next) {
  const user = process.env.DEMO_USER;
  const pass = process.env.DEMO_PASS;
  if (!user || !pass) return next();

  const header = req.headers.authorization || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      decoded = Buffer.from(encoded, 'base64').toString('utf8');
    } catch {
      // fall through to 401 below
    }
    const sep = decoded.indexOf(':');
    if (sep !== -1) {
      const suppliedUser = decoded.slice(0, sep);
      const suppliedPass = decoded.slice(sep + 1);
      if (safeEqual(suppliedUser, user) && safeEqual(suppliedPass, pass)) {
        return next();
      }
    }
  }

  res.set('WWW-Authenticate', 'Basic realm="Bangkok Transit Navigator Demo"');
  res.status(401).send('Authentication required.');
}

module.exports = { basicAuth };
