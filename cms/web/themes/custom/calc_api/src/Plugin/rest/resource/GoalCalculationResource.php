<?php

namespace Drupal\calc_api\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a resource to log calculations.
 *
 * @RestResource(
 * id = "goal_calculation_resource",
 * label = @Translation("Goal Calculation Resource"),
 * uri_paths = {
 * "create" = "/api/v1/calculate"
 * }
 * )
 */
class GoalCalculationResource extends ResourceBase {

  public function post(array $data) {
    // Deterministic validation of inputs
    if (empty($data['present_cost']) || empty($data['years'])) {
      return new ResourceResponse(['error' => 'Missing required fields'], 400);
    }

    // MySQL logic: In a real Drupal setup, you'd use the Entity API 
    // or Database API to log this request.
    $query = \Drupal::database()->insert('calc_logs')
      ->fields([
        'cost' => $data['present_cost'],
        'years' => $data['years'],
        'inflation' => $data['inflation'],
        'created' => time(),
      ])
      ->execute();

    return new ResourceResponse(['status' => 'success', 'id' => $query], 201);
  }
}