/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const logo = 'BDTS media'
      let type = 'home'
      res.render('home/index', { logo, type })
    } catch (error) {
      next(error)
    }
  }
}