using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dinner_winner;
using dinner_winner.Models;
using Microsoft.AspNetCore.Authorization;

namespace sdg_react_template.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class RestaurantController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public RestaurantController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Restaurant
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      var all = await _context.Restaurants.Where(w => w.UserId == userId).ToListAsync();

      return all;

    }
    [HttpGet("{location}")]
    public async Task<ActionResult<List<string>>> GetLocations()
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      var locations = await _context.Restaurants.Where(w => w.UserId == userId).Select(s => s.Location).ToListAsync();

      return locations;
    }

    [HttpGet("distinctLocations")]
    public async Task<ActionResult<List<string>>> GetDistinctLocations()
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      var locationNames = await _context.Restaurants.Where(w => w.UserId == userId).Select(s => s.Location).Distinct().ToListAsync();

      return locationNames;
    }

    [HttpGet("distinctTypes")]
    public async Task<ActionResult<List<string>>> GetDistinctTypes()
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      var typesNames = await _context.Restaurants.Where(w => w.UserId == userId).Select(s => s.Type).Distinct().ToListAsync();

      return typesNames;
    }

    // GET: api/Restaurant/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
    {
      var restaurant = await _context.Restaurants.FindAsync(id);

      if (restaurant == null)
      {
        return NotFound();
      }

      return restaurant;
    }

    // PUT: api/Restaurant/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRestaurant(int id, Restaurant restaurant)
    {
      if (id != restaurant.Id)
      {
        return BadRequest();
      }

      _context.Entry(restaurant).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RestaurantExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Restaurant
    [HttpPost]
    public async Task<ActionResult<Restaurant>> PostRestaurant(Restaurant restaurant)
    {
      var userId = User.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
      restaurant.UserId = userId;
      _context.Restaurants.Add(restaurant);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetRestaurant", new { id = restaurant.Id }, restaurant);
    }

    // DELETE: api/Restaurant/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Restaurant>> DeleteRestaurant(int id)
    {
      var restaurant = await _context.Restaurants.FindAsync(id);
      if (restaurant == null)
      {
        return NotFound();
      }

      _context.Restaurants.Remove(restaurant);
      await _context.SaveChangesAsync();

      return restaurant;
    }

    private bool RestaurantExists(int id)
    {
      return _context.Restaurants.Any(e => e.Id == id);
    }
  }
}
